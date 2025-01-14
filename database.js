import mysql2 from 'mysql2';
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql2.createPool({
    host: 'monorail.proxy.rlwy.net',
    user: 'root',
    password: 'HEnoDMGmkJJOpejrKYQwtijWxKGPcChd',
    database: 'bd_app_delivery',
    port: 18946,
});
