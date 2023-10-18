import React, { useState } from "react";

const CreateView = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [price, setPrice] = useState("");
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    const handleCreateEvent = () => {
        if (selectedFile) {
            console.log("Tệp đã được chọn:", selectedFile);
            console.log("Location:", location);
            console.log("Time:", time);
            console.log("Price:", price);
        } else {
            alert("Vui lòng chọn một hình ảnh.");
        }
    };
    return (

        <div className="CreateView">
            <div className="ViewForm">
                <form>
                    <h3>Create Event</h3>
                    <div className="mb-3">
                        <label htmlFor="TicketImg" className="label-control">Images:</label>
                        <input type="file" id="TicketImg" onChange={handleFileChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="TicketName" className="label-control">Name:</label>
                        <input type="text" placeholder="Ticket Name" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="NFT Symbol" className="label-control">NFT Symbol</label>
                        <input type="text" placeholder="NFT Symbol" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="label-control">Description:</label>
                        <input type="text" placeholder="Description" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="label-control">External URL:</label>
                        <input type="text" placeholder="External URL" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Location" className="label-control">
                            Location:
                        </label>
                        <input
                            type="text"
                            placeholder="Event Location"
                            className="form-control"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Time" className="label-control">
                            Time:
                        </label>
                        <input
                            type="text"
                            placeholder="Event Time"
                            className="form-control"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Price" className="label-control">
                            Price:
                        </label>
                        <input
                            type="text"
                            placeholder="Event Price"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
export default CreateView;