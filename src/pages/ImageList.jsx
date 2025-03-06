import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const ImageList = () => {
    const [editImage, setEditImage] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [deleteImageId, setDeleteImageId] = useState(null);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        if (refreshPage) {
            window.location.reload();
        } else {
            axios.get("http://127.0.0.1:8000/api/admin-image")
                .then(response => setEditImage(response.data))
                .catch(error => console.error("Error fetching data", error));
        }
    }, [refreshPage]);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setIsImageSelected(true);
            setIsUploaded(false);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            await axios.post("http://127.0.0.1:8000/api/admin-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setModalMessage("Image uploaded successfully");
            setRefreshPage(true);
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteImageId(id);
        setModalMessage("Are you sure you want to delete this image?");
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/admin-image/${deleteImageId}`);
            setModalMessage("Image deleted successfully");
            setRefreshPage(true);
        } catch (error) {
            console.error("Error deleting image", error);
        }
    };

    const handleCancel = () => {
        setImage(null);
        setImagePreview(null);
        setIsImageSelected(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: '#e3d2b9' }}>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    {modalMessage.includes("Are you sure") ? (
                        <>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                No
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Yes
                            </Button>
                        </>
                    ) : (
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            <div>
                {editImage.length > 0 ? (
                    editImage.map(image => (
                        <div key={image.id} style={{ position: "relative", display: "inline-block", textAlign: "center", margin: "10px" }}>
                            <img
                                src={`http://127.0.0.1:8000/${image.image_path}`}
                                alt="Profile"
                                style={{
                                    borderRadius: "5%",
                                    transition: "opacity 0.1s",
                                    maxWidth: "75%",  // Ensure image doesn't overflow its container
                                    height: "auto",     // Maintain aspect ratio
                                }}
                            />

                            {/* Delete Icon (Appears on Hover) */}
                            <div
                                onClick={() => handleDeleteConfirmation(image.id)}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    width: "75%",
                                    height: "100%",
                                    borderRadius: "10%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: 0, // Initially hidden
                                    transition: "opacity 0.3s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                            >
                                <i className="bi bi-trash" style={{ color: "white", fontSize: "24px" }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            id="fileInput"
                        />
                        {!isImageSelected && !isUploaded && (
                            <a
                                href="#"
                                className="btn btn-sm"
                                title="Choose image to upload"
                                onClick={() => document.getElementById('fileInput').click()}
                                style={{ width: "150px", marginRight: "10px", display: "inline-block", backgroundColor: "#e3d2b9" }}
                            >
                                Choose Image <i className="bi bi-upload" />
                            </a>
                        )}
                        {imagePreview && (
                            <div style={{ textAlign: "center" }}>
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: "75%", height: "auto", borderRadius: "10%" }} />
                                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                                    <button
                                        onClick={handleCancel}
                                        className="btn btn-secondary btn-sm"
                                        style={{ width: "150px" }}
                                    >
                                        Cancel <i className="bi bi-x" />
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        className="btn btn-sm"
                                        style={{ width: "150px", backgroundColor: "#e3d2b9" }}
                                    >
                                        Upload <i className="bi bi-upload" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageList;
