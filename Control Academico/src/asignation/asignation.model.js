import mongoose from "mongoose"

const asignationSchema = mongoose.Schema({
    asignature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'asignature'
    },
    username: {
        type: String,
        required: true
    }
})

export default mongoose.model('asignation', asignationSchema)