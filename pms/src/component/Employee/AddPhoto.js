import React, { useState } from "react";
import { storage } from "../../firebase"; // Assuming you have Firebase configured
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

function AddPhoto() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const uploadFile = () => {
    if (!selectedFile) {
      toast.error("Please select a file.");
      return;
    }
    
    const fileRef = ref(storage, `Images/${selectedFile.name + Date.now()}`);
    uploadBytes(fileRef, selectedFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // Send the download URL to your server for storage in MongoDB
        handleUpload(url);
      });
    });
  };

  const handleUpload = (url) => {
    const requestBody = {
      image: url,
    };
    const id = JSON.parse(localStorage.getItem("user"))._id;

    // Make an API request to your server to store the URL
    fetch(`/api/${id}/update/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setSelectedFile(null);
          setPreviewUrl(null);
        } else {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Failed to upload image:", error);
      });
  };

  return (
    <div className="log">
      <div className="card col-md-6">
        <h5>Add Photo</h5>
        <div>
          <label className="log_label">Select Photo</label>
          <input className="logfield" type="file" onChange={handleFileChange} />
        </div>
        {previewUrl && (
          <div>
            <div>
              <img src={previewUrl} alt="selected image" />
            </div>
          </div>
        )}
        <div>
          <input
            className="log_label logfield button_log"
            type="button"
            value="Update"
            onClick={uploadFile}
          />
        </div>
      </div>
    </div>
  );
}

export default AddPhoto;
