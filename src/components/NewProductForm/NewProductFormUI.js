import React, {useRef} from "react";
import Select from "react-select";

const NewProductFormUI = ({
                              handleSubmit,
                              _public,
                              handleSelect,
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
                        <form onSubmit={(event) => handleSubmit(event)} encType="multipart/form-data">
                            <div className="ibox-title">
                                <h5>Add new product <small>Fill out the fields to add a new product to the store</small>
                                </h5>

                            </div>
                            <div className="ibox-content">
                                <div className="form-group row">

                                    <label className="col-sm-2 col-form-label">Category</label>
                                    <div className="col-sm-10">
                                        <Select
                                            options={
                                                Object.values(category).map(x => {
                                                    return {
                                                        label: x.name,
                                                        value: x.id
                                                    }

                                                })
                                            }
                                            isClearable={true}
                                            placeholder="Seleccione"
                                            onChange={(e) => handleSelect(e)}
                                        />

                                    </div>
                                    <div className="hr-line-dashed"/>
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
                                    <label className="col-sm-2 col-form-label">Price</label>
                                    <div className="col-sm-10">
                                        <input name="price_cost" value={price_cost} onChange={(e) => handleChange(e)}
                                               type="text"
                                               className="form-control"/>
                                    </div>

                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Is Public ?</label>
                                    <div className="col-sm-10">
                                        <input type="checkbox" onChange={(e) => handlePublic(e)}
                                               name="_public"/> Public
                                    </div>
                                    <div className="hr-line-dashed"/>
                                    <label className="col-sm-2 col-form-label">Image</label>
                                    <div className="col-sm-10">
                                        <input ref={file} name="image" type="file" onChange={() => {
                                            if (file.current.files[0]) {
                                                img.current.src = URL.createObjectURL(file.current.files[0])
                                                label.current.childNodes[0].textContent = file.current.files[0].name
                                                handleFile(file.current.files[0])
                                            } else {
                                                img.current.src = null
                                                label.current.childNodes[0].textContent = "Choose file..."
                                                handleFile(file.current.files[0])
                                            }

                                        }} accept="image/*"
                                               className="custom-file-input"/>
                                        <label ref={label} className="custom-file-label">Choose
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