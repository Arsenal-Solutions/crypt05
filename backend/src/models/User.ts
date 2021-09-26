import {Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, DefaultScope, Scopes} from 'sequelize-typescript';

type UserCreationType = {
    username: string,
    password: string,
    privateKey: string,
    address: string
}

type UserDataType = {
    id: number,
    username: string,
    password: string,
    privateKey: string,
    address: string,
    createdAt: Date,
    updatedAt: Date
}

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Scopes(() => ({
    withPassword: {
        attributes: [
            'id', 'username', 'password', 'createdAt', 'updatedAt'
        ]
    }
}))
@Table
export default class User extends Model<UserDataType, UserCreationType> {

    @PrimaryKey
    @Column
    id: number;

    @Column
    username: string;

    @Column
    password: string;

    @Column
    privateKey: string;

    @Column
    address: string;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;
}

User.prototype.toJSON = function (): object {
    const values = Object.assign({}, this.get());

    delete values.password;
    delete values.privateKey;
    return values;
}