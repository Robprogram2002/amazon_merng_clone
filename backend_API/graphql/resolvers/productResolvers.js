const User = require("../../models/User");
const { UserInputError, AuthenticationError } = require("apollo-server");
const Department = require("../../models/Department");
const Category = require("../../models/Category");
const Seller = require("../../models/Seller");
const Product = require("../../models/Product");

const adminCheck = async (context) => {
  if (!context.user) {
    throw new AuthenticationError("Not user Authenticated");
  }
  const { userId } = context.user;
  const user = await User.findById(userId);
  if (user.class !== "admin") {
    throw new AuthenticationError(
      "This account not has permisson for this action"
    );
  }
};

module.exports = {
  Query: {
    getDepartments: async (_, { departmentId }) => {
      try {
        if (departmentId) {
          const deparment = await Department.findById(departmentId).populate(
            "categories"
          );
          if (!deparment) {
            throw new UserInputError("Not department was found with this id");
          }

          return [
            {
              ...deparment.toJSON(),
              departmentId: deparment._id,
            },
          ];
        } else {
          const deparments = await Department.find().populate("categories");
          return deparments.map((deparment) => {
            return {
              ...deparment.toJSON(),
              departmentId: deparment._id,
            };
          });
        }
      } catch (error) {
        throw error;
      }
    },
    getCategories: async (_, { categoryId }) => {
      try {
        if (categoryId) {
          const category = await Category.findById(categoryId);
          if (!category) {
            throw new UserInputError("Not category was found with this id");
          }

          return [
            {
              ...category.toJSON(),
              categoryId: category._id,
            },
          ];
        } else {
          const categories = await Category.find();

          return categories.map((category) => ({
            ...category.toJSON(),
            categoryId: category._id,
          }));
        }
      } catch (error) {
        throw error;
      }
    },
    getProducts: async (
      _,
      { departmentId, categoryId, subcategoryId, productId }
    ) => {
      try {
        let products;
        if (departmentId) {
          products = await Product.find({ departmentId });
        } else if (categoryId) {
          products = await Product.find({ categoryId });
        } else if (subcategoryId) {
          products = await Product.find({ subcategoryId });
        } else if (productId) {
          const product = await Product.findById(productId);

          if (!product) {
            throw UserInputError("Not product was found with this Id");
          }

          return [
            {
              ...product.toJSON(),
              productId: product._id,
            },
          ];
        }

        if (!products) {
          throw new UserInputError("Not products was found for this data");
        }

        return products.map((product) => ({
          ...product.toJSON(),
          productId: product._id,
        }));
      } catch (error) {
        throw error;
      }
    },
    getSellers: async (_, { sellerId }) => {
      try {
        if (sellerId) {
          const seller = await Seller.findById(sellerId);
          if (!seller) {
            throw UserInputError("Not seller was found with this  id");
          }

          return [
            {
              ...seller.toJSON(),
              sellerId: seller._id,
            },
          ];
        } else {
          const sellers = await Seller.find();
          return sellers.map((seller) => ({
            ...seller.toJSON(),
            sellerId: seller._id,
          }));
        }
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addDepartment: async (_, { title, images }, context) => {
      await adminCheck(context);

      const department = await Department.create({
        title,
        images,
      });

      return {
        title: department.title,
        images: department.images,
        createdAt: department.createdAt,
        departmentId: department._id,
      };
    },
    addCategory: async (
      _,
      { title, subcategories, image, departmentId },
      context
    ) => {
      await adminCheck(context);

      const deparment = await Department.findById(departmentId);

      if (!deparment) {
        throw new UserInputError("Not deparment was found with this id");
      }

      const category = await Category.create({
        departmentId,
        title,
        subcategories,
        image,
      });

      deparment.categories = [...deparment.categories, category._id];
      await deparment.save();

      return {
        title: category.title,
        image: category.image,
        subcategories: category.subcategories && category.subcategories,
        createdAt: category.createdAt,
        departmentId: category.departmentId,
        categoryId: category._id,
      };
    },
    addSeller: async (
      _,
      {
        userId,
        companyName,
        companyImage,
        location,
        description,
        images,
        contacts,
      }
    ) => {
      const seller = await Seller.create({
        userId,
        companyName,
        companyImage,
        location,
        description,
        images: images && images,
        contacts: contacts && contacts,
      });

      return {
        userId: userId,
        companyName: companyName,
        companyImage: companyImage,
        location: location,
        description: description,
        images: images && images,
        contacts: contacts && contacts,
        rating: seller.rating,
        sellerId: seller._id,
      };
    },
    addProduct: async (
      _,
      {
        sellerId,
        departmentId,
        categoryId,
        subcategoryId,
        title,
        description,
        images,
        price,
        stock,
        brand,
        caracteristicas,
        prime,
        discount,
      },
      context
    ) => {
      await adminCheck(context);

      const product = await Product.create({
        sellerId,
        departmentId,
        categoryId,
        subcategoryId: subcategoryId && subcategoryId,
        title,
        description,
        images,
        price,
        stock,
        brand,
        caracteristicas,
        prime,
        discount: discount && discount,
      });

      return {
        ...product.toJSON(),
        productId: product._id,
      };
    },
  },
};
