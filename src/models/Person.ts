import { Schema, model } from "mongoose"
import PersonI from "./PersonInterface";

const personSchema = new Schema<PersonI>({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    approved: { type: Boolean, required: true }
})

const Person = model<PersonI>('Person',personSchema);

export default Person;