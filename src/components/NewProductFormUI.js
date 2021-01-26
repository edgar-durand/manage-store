import React, {useRef} from "react";

const NewProductFormUI = ({
                              handleSubmit,
                              _public,
                              Product_category,
                              inStock,
                              price_vent,
                              price_cost,
                              description,
                              name,
                              category,
                              handleChange,
                              handleFile,
                              handlePublic
                          }) => {
    const img = useRef('img');
    const file = useRef('file');
    const label = useRef('label');

    return (

        <div className="wrapper wrapper-content animated fadeInRight">
            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox ">
                        <form action="" onSubmit={(event) => handleSubmit(event)} encType="multipart/form-data">
                            <div className="ibox-title">
                                <h5>Add new product <small>Fill out the fields to add a new product to the store</small>
                                </h5>

                            </div>
                            <div className="ibox-content">

                                <div className="form-group row">

                                    <label className="col-sm-2 col-form-label">Product</label>
                                    <div className="col-sm-10">
                                        <input name="name" value={name} onChange={(e) => handleChange(e)} type="text"
                                               className="form-control"/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Description</label>
                                    <div className="col-sm-10">
                                        <input name="description" value={description} onChange={(e) => handleChange(e)}
                                               type="text"
                                               className="form-control"/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Prior Price</label>
                                    <div className="col-sm-10">
                                        <input name="price_cost" value={price_cost} onChange={(e) => handleChange(e)}
                                               type="text"
                                               className="form-control"/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Sales Price</label>
                                    <div className="col-sm-10">
                                        <input name="price_vent" value={price_vent} onChange={(e) => handleChange(e)}
                                               type="text"
                                               className="form-control"/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Quantity</label>
                                    <div className="col-sm-10">
                                        <input name="inStock" value={inStock} onChange={(e) => handleChange(e)}
                                               type="number"
                                               defaultValue="1" min="0"
                                               className="form-control"/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <select name="category" value={Product_category}
                                                onChange={(e) => handleChange(e)}>
                                            <option value="0">Select category...</option>
                                            {
                                                Object.values(category).map(categories => {
                                                    return Object.values(categories).map((category, index) => {
                                                        return <option key={index}
                                                                       value={category.id}>{category.name}</option>
                                                    });
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Is Public ?</label>
                                    <div className="col-sm-10">
                                        <input type="checkbox" onChange={(e) => handlePublic(e)}
                                               name="_public"/> Public
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Image</label>
                                    <div className="custom-file col-sm-10">
                                        <input ref={file} name="image" id="logo" type="file" onChange={(e) => {
                                            if (file.current.files[0]) {
                                                img.current.src = URL.createObjectURL(file.current.files[0])
                                                label.current.childNodes[0].textContent = file.current.files[0].name
                                                handleFile(file.current.files[0])
                                            } else {
                                                img.current.src = ""
                                                label.current.childNodes[0].textContent = "Choose file..."
                                            }

                                        }} accept="image/*"
                                               className="custom-file-input"/>
                                        <label ref={label} htmlFor="logo" className="custom-file-label">Choose
                                            file...</label>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label"/>
                                    <div className="custom-file col-sm-10" style={{
                                        height: "auto"
                                    }}>
                                        <img ref={img} width="400px" name="showImg" alt="" style={{
                                            objectFit: "contain"
                                        }}/>
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label"/>
                                    <div className="col-sm-10" style={{display: "content"}}>
                                        <input type="submit" className="btn btn-primary col-lg-auto float-right"
                                               style={{marginTop: '20px'}} value="Save"/>
                                    </div>


                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>


    )
}
export default NewProductFormUI