import '../styles/VideoUploadPlaceholder.css'

export default function VideoUploadPlaceholder({ onUpload }) {
    return (
        <div className="placeholder-container" onClick={onUpload}>
            <p>Upload Video</p>
        </div>
    )
}