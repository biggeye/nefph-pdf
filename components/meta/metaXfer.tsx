'use client';

import React, { useState, ChangeEvent } from 'react';
import EXIF from 'exif-js';

const MetadataTransfer: React.FC = () => {
    const [graphicImage, setGraphicImage] = useState<File | null>(null);
    const [metadataImage, setMetadataImage] = useState<File | null>(null);
    const [outputImage, setOutputImage] = useState<string | null>(null);

    const handleGraphicImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setGraphicImage(e.target.files[0]);
        }
    };

    const handleMetadataImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMetadataImage(e.target.files[0]);
        }
    };

    const handleTransferMetadata = () => {
        if (!graphicImage || !metadataImage) {
            alert('Please upload both images.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const metadataImageData = e.target?.result as string;
            EXIF.getData(metadataImageData, function (this: any) {
                const metadata = EXIF.getAllTags(this);

                const graphicReader = new FileReader();
                graphicReader.onload = (e) => {
                    const graphicImageData = e.target?.result as string;
                    const img = new Image();
                    img.src = graphicImageData;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(img, 0, 0);

                            // Add EXIF metadata to the graphic image
                            // Note: EXIF.insertExifData is a placeholder and may need to be implemented
                            // EXIF.insertExifData(canvas, metadata);

                            canvas.toBlob((blob) => {
                                if (blob) {
                                    const url = URL.createObjectURL(blob);
                                    setOutputImage(url);
                                }
                            }, 'image/jpeg');
                        }
                    };
                };
                graphicReader.readAsDataURL(graphicImage);
            });
        };
        reader.readAsDataURL(metadataImage);
    };

    return (
        <div>
            <h1>Metadata Transfer</h1>
            <div>
                <label>
                    Graphic Image:
                    <input type="file" accept="image/*" onChange={handleGraphicImageChange} />
                </label>
            </div>
            <div>
                <label>
                    Metadata Image:
                    <input type="file" accept="image/*" onChange={handleMetadataImageChange} />
                </label>
            </div>
            <button onClick={handleTransferMetadata}>Transfer Metadata</button>
            {outputImage && (
                <div>
                    <h2>Output Image:</h2>
                    <img src={outputImage} alt="Output" />
                    <a href={outputImage} download="output.jpg">Download Output Image</a>
                </div>
            )}
        </div>
    );
};

export default MetadataTransfer;
