import { DataTypes, Model } from "sequelize";
import { default as sequelize } from "../utils/postgresql";
import { encryptPassword } from "../utils/authentication";
import { UUID } from "crypto";

class User extends Model {
  id!: UUID;
  dni!: string;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  cellphone!: string;
  active!: boolean;

  static login(email: string, password: string) {
    return User.findOne({
      where: { email, password: encryptPassword(password) },
    });
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 10],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password: string) {
        this.setDataValue("password", encryptPassword(password));
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    cellphone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
