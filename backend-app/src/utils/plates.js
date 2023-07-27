const validateSection = (name) => {
    return name && name.length >= 2;
  };

const validatePrice = (price) => {
    return price && price > 0;
    }

const validateImage = (body) => {
    if (body.has_img) {
        return body.img_url && body.img_url.length > 0;
    } else {
        return true;
    }
}

const validatePlatesBody = (body) => {

    return (
        validateSection(body.name) &&
        validateSection(body.details) &&
        validatePrice(body.price)
    );    
}

module.exports = { validatePlatesBody, validateImage };