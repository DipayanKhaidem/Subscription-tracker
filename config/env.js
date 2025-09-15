import {config} from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); //since we want multiple .env files for different environments
//Its called a template string
export const {PORT,NODE_ENV,DB_URI}=process.env;
//This way we can switch between our development
//and production environments without overriding one another