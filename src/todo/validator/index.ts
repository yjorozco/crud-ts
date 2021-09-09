import { body, query, param } from 'express-validator';

class TodoValidator {
    checkCreateTodo() {
        return [
            body('id')
                    .optional()
                    .isUUID(4)
                    .withMessage('The value should be UUID'),
            body("title")
                        .notEmpty()
                        .withMessage('title should not be empty'),
            body("completed")
                        .optional()
                        .isBoolean()
                        .withMessage('the value should be boolean')
                        .isIn([0,false])
                        .withMessage('The value should be 0 or false')
          ];
    }
    checkReadTodo() {
        return [
            query('limit')
                .notEmpty()
                .withMessage('The query limit should be not empty')
                .isInt({min:1, max:10})
                .withMessage('The limit value should be number and between 1-10'),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage('The value should be number')
        ]
    }
    checkIdParam(){
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
				.isUUID(4)
				.withMessage('The value should be uuid v4'),
            
        ]
    }

}


export default new TodoValidator;