// /components/assets/MediaGallery.tsx

interface Asset {
    url: string;
    type: string;
    description?: string;
}

interface MediaGalleryProps {
    assets: Asset[];
}

export default function MediaGallery({ assets }: MediaGalleryProps) {
    return (
        <div className="media-gallery">
            {assets.map((asset, index) => (
                <div key={index}>
                    {asset.type.startsWith('image') ? (
                        <img src={asset.url} alt={asset.description ?? 'Asset image'} />
                    ) : (
                        <video controls src={asset.url}>
                            Your browser does not support the video tag.
                        </video>
                    )}
                    {asset.description && <p>Description: {asset.description}</p>}
                </div>
            ))}
        </div>
    );
}
