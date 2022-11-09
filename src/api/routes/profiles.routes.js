const express = require('express');
const router = express.Router();
const controller = require('../controllers/profiles.controller');
const { ProfilesError, InternalServerError } = require('../errors');

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           description: |
 *             HTTP status code
 *             <ul>
 *               <li>401: Unauthorized</li>
 *               <li>404: Not Found</li>
 *               <li>409: Conflict</li>
 *               <li>500: Internal Server Error</li>
 *             </ul>
 *         error: 
 *           type: string
 *           description: Error
 *         message: 
 *           type: string
 *           description: Description of the error
 *     ApplicationVersionDescription:
 *       type: object
 *       properties:
 *         applicationId:
 *           type: string
 *         version:
 *           type: string
 */

/**
 * @swagger 
 * paths:
 *   /profiles:
 *     get:
 *       summary: Retrieve a list of all applications' versions.
 *       parameters:
 *         - in: header
 *           name: x-client-id
 *           schema:
 *             type: string
 *         - in: header
 *           name: x-authentication-token
 *           schema:
 *             type: string
 *       tags:
 *         - Profiles
 *       responses:
 *         200:
 *           description: Successful operation.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   profile:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: array
 *                         items: 
 *                           $ref: '#/components/schemas/ApplicationVersionDescription'
 *               examples:
 *                 ex:
 *                   summary: Successful operation
 *                   value: {profile: {applications: [ {applicationId: "music_app", version: "v1.4.10"}, {applicationId: "diagnostic_app", version: "v1.2.6"} ]} }
 *         401:
 *           description: Unauthorized
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 ex: 
 *                   summary: Unauthorized
 *                   value: {statusCode: 401, error: "Unauthorized", message: "invalid clientId or token supplied"}
 *         404:
 *           description: Not found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 ex: 
 *                   summary: Not Found
 *                   value: {statusCode: 404, error: "Not Found", message: "profile of client 823f3161ae4f4495bf0a90c00a7dfbff does not exist"}
 *         409:
 *           description: Conflict
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 ex: 
 *                   summary: Conflict
 *                   value: {statusCode: 409, error: "Conflict", message: "Profile failed"}
 *         500:
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 ex: 
 *                   summary: Internal Server Error
 *                   value: {statusCode: 500, error: "Internal Server Error", message: "An internal server error occurred"}
 */

router.get('/',  async (req, res) => {
    //set the header returned as JSON format
    res.header('Content-Type', 'application/json');

    let response = {};

    try {
        // Get profile for the provided client Id
        response.profile = controller.getProfile(req.headers['x-client-id'], req.headers['x-authentication-token']);

        res.status(200).json(response);
    } catch (error) {
        // If there is an error - set the appropriate status code and fill the response
        if (error instanceof ProfilesError) {
            const err = {...error, message: error.message};
            res.status(err.statusCode).json(err); 
        } else {
            const err = new InternalServerError();
            res.status(err.statusCode).json(err); 
        }
    }
});

module.exports = router;