const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const envPath = path.resolve(__dirname, "../.env");
const secret = crypto.randomBytes(32).toString("base64");

const defaultPlaceholder = "your_generated_secret_here";

let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

const secretMatch = envContent.match(/NEXTAUTH_SECRET="?([^"\n]*)"?/);

if (secretMatch) {
  const currentSecret = secretMatch[1];

  if (currentSecret === defaultPlaceholder) {
    envContent = envContent.replace(/NEXTAUTH_SECRET=.*/, `NEXTAUTH_SECRET="${secret}"`);
    fs.writeFileSync(envPath, envContent.trim() + "\n");
    console.log(`✅ NEXTAUTH_SECRET was set to a new value.`);
  } else {
    console.log(`✅ NEXTAUTH_SECRET already exists and will not be changed.`);
  }
} else {
  envContent += `\nNEXTAUTH_SECRET="${secret}"`;
  fs.writeFileSync(envPath, envContent.trim() + "\n");
  console.log(`✅ NEXTAUTH_SECRET has been added to .env.`);
}
