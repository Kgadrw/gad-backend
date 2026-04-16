import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

let configured = false;

function ensureConfigured() {
  if (configured) return;

  if (env.cloudinaryUrl) {
    cloudinary.config({
      cloudinary_url: env.cloudinaryUrl,
    });
    configured = true;
    return;
  }

  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    throw new Error("Cloudinary is not configured on the backend.");
  }

  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });

  configured = true;
}

export async function uploadImageBuffer(buffer: Buffer, folder = "social-coder-showcase") {
  ensureConfigured();

  return await new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve({ secure_url: result.secure_url });
      },
    );

    stream.end(buffer);
  });
}
