const { ObjectId } = require('mongodb');

module.exports = (mongoose) => {
    const { Schema, model } = mongoose;
    const { String, Date } = Schema.Types;

    const courseSchema = new Schema({
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        imageUrl: {
            type: String,
            required: true
        },

        duration: {
            type: String,
            required: true
        },

        createdAt: {
            type: String,
            required: true
        },

        usersEnroled: [
            {
                type: ObjectId,
                ref: 'User'
            }
        ],

        courseCreator: {
            type: ObjectId,
            required: true
        }
    });

    return model('Course', courseSchema);
}