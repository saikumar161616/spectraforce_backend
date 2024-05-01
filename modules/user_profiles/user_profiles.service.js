/**
 * @constant CustomError class to handle errors
 */
const CustomError = require('../../error-handlers/custom-error');

/**
 * @constant HTTP_STATUS http status codes
 */
const HTTP_STATUS = require('../../constants/http.constant');

const { userModel } = require('./user_profiles.model');

const fs = require('fs');

const path = require('path');

class UserService {
    constructor() {
    }

    /**
     * @method users:createNewUserAccount
     * @description adds new user record to the db after successful validation
     * @returns successful response when no error occured during creating new user account
    */
    async createNewUser(user) {
        try {
            await new userModel(user).save();

            return {
                message: 'User created succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while creating new user account: ${error.message}`);
            if (error && error?.code === 11000) throw new CustomError('User already exists with given mobile number', HTTP_STATUS.DUPLICATE);
            else throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async getAllUsers() {
        try {
            let users = await userModel.find({}, { _id: 0 });

            return {
                message: 'Users fetched succesfully',
                data: users,
                status: true,
            };

        } catch (error) {
            console.log(`Error while fetching users: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async getUserUploadedFile(uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to fetch the details', HTTP_STATUS.NOT_FOUND);
            // Get the current directory
            const currentDir = __dirname;
            // Navigate back two folders
            const targetDir = path.resolve(currentDir, '../../uploads');

            let fileType = user?.file.split('.');

            console.log(fileType, 'in 69')

            let file = fs.readFileSync(`${targetDir}/${user.file}`, (err, data) => {
                if (err) {
                    console.log(err, 'in 63')
                    // If there's an error reading the file, send an error response
                    throw new CustomError('Error on fetching file', HTTP_STATUS.INTERNAL_SERVER_ERROR);
                }
                return data;
            });

            return {
                message: 'User fetched succesfully',
                data: file,
                fileName: user?.file,
                status: true,
            };

        } catch (error) {
            console.log(`Error while fetching user uploaded file: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async getUserById(uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to fetch the details', HTTP_STATUS.NOT_FOUND);

            return {
                message: 'User fetched succesfully',
                data: user,
                status: true,
            };

        } catch (error) {
            console.log(`Error while fetching users: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async updateUserDetails(userReqObj, uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to update the details', HTTP_STATUS.NOT_FOUND);
            await userModel.updateOne({ uniqueId: uniqueId }, userReqObj)

            return {
                message: 'User updated succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while creating new user account: ${error.message}`);
            if (error && error?.code === 11000) throw new CustomError('User already exists with given mobile number', HTTP_STATUS.DUPLICATE);
            else throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async deleteUser(uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to delete', HTTP_STATUS.NOT_FOUND);
            await userModel.deleteOne({ uniqueId: uniqueId });

            return {
                message: 'User deleted succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while deleting user: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new UserService();		