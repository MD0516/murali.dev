import bcrypt from "bcryptjs";
import mongoose from "mongoose"

interface IAdminUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const adminUserSchema = new mongoose.Schema<IAdminUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true, select: false },
    },
    { timestamps: true }
)

adminUserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

adminUserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
}

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminUserSchema);

export default Admin;