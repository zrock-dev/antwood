export const packCurrentQuantityQuery = (products) => {
    let dataRequest = [];
    for (let i = 0; i < products.length; i++) {
      dataRequest.push({
        sneakerId: products[i].sneakerId,
        sneakerColorId: products[i].sneakerColorId,
        size: products[i].size,
        quantity: products[i].quantity,
      });
    }
    return dataRequest;
}