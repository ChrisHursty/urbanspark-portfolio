const { registerBlockType } = wp.blocks;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

// Portfolio Details Block
registerBlockType('portfolio-us/portfolio-details', {
  title: 'UrbanSpark Portfolio Details',
  icon: 'portfolio', // You can use any WordPress Dashicon or your own SVG
  category: 'layout',

  attributes: {
    details: {
        type: 'array',
        default: [],
    },
  },



    edit: function(props) {
        const { attributes: { details }, setAttributes } = props;

        const handleChange = (key, value, index) => {
            const newDetails = [...details];
            newDetails[index] = { ...newDetails[index], [key]: value };
            setAttributes({ details: newDetails });
        };

        const handleAddDetail = () => {
            setAttributes({ details: [...details, { key: '', value: '' }] });
        };

        const handleRemoveDetail = (index) => {
            const newDetails = details.filter((_, i) => i !== index);
            setAttributes({ details: newDetails });
        };

        return (
            <div>
                {details.map((detail, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Key"
                            value={detail.key}
                            onChange={(e) => handleChange('key', e.target.value, index)}
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={detail.value}
                            onChange={(e) => handleChange('value', e.target.value, index)}
                        />
                        <button onClick={() => handleRemoveDetail(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddDetail}>Add Detail</button>
            </div>
        );
    },


    save: function(props) {
        const { details } = props.attributes;
    
        return (
            <ul>
                {details.map((detail, index) => (
                    <li key={index}>
                        <strong>{detail.key}</strong>: {detail.value}
                    </li>
                ))}
            </ul>
        );
    },
    
});

// Portfolio Slider Block
registerBlockType('portfolio-us/portfolio-slider', {
    title: 'UrbanSpark Portfolio Slider',
    icon: 'images-alt2',
    category: 'media',

    attributes: {
        images: {
            type: 'array',
            default: [],
        },
    },

    edit: ({ attributes, setAttributes }) => {
        const { images } = attributes;

        const onSelectImages = (newImages) => {
            setAttributes({ 
                images: newImages.map(image => ({
                    id: image.id,
                    url: image.url,
                    caption: image.caption
                }))
            });
        };

        return (
            <div>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        value={images.map(image => image.id)}
                        render={({ open }) => (
                            <Button onClick={open} isPrimary>
                                Upload Images
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                {images.length > 0 && (
                    <ul>
                        {images.map((image, index) => (
                            <li key={index}>
                                <img src={image.url} alt={image.caption} />
                                <p>{image.caption}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    },

    save: ({ attributes }) => {
        const { images } = attributes;

        return (
            <div className="urbanspark-portfolio-slider">
                <div className="slides">
                    {images.map((image, index) => (
                        <div key={index} className="slide">
                            <img src={image.url} alt={image.caption} />
                            {image.caption && <p className="caption">{image.caption}</p>}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
});

// Add here the edit and save function code for the 'portfolio-us/portfolio-slider' block