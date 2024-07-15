
import { useEffect, useRef, useState } from "react"

const Local = () => {
    const [view, setview] = useState({})
    let productName = useRef();
    let price = useRef();

    // add
    let product = JSON.parse(localStorage.getItem("product")) || [];
    let addProduct = () => {
        let data = {
            productName: productName.current.value,
            price: price.current.value,
        }
        console.log(data);
        product.push(data)

        localStorage.setItem("product", JSON.stringify(product))

    }

    //get 
    let getProdut = () => {
        let res = JSON.parse(localStorage.getItem("product"))
        console.log(res);
    }
    useEffect(() => {
        getProdut()

    }, [])
    //remove

    let remove = (ind) => {
        console.log(ind);

        let products = product[ind]
        console.log(product);

        let res = product.filter((val) => val.productName != products.productName)
        console.log(res);

        localStorage.setItem("product", JSON.stringify(res))
    }

    //update
    let update = (productName, price, ind) => {
        setview({ productName, price, ind })
    }

    let handle = (e) => {
        setview({ ...view, [e.target.name]: e.target.value })
    }
    let save = () => {
        product.splice(view.ind, 1, view)
        console.log(product);
        localStorage.setItem("product", JSON.stringify(product))
    }



    return (
        <div>

            <div className="box">
                name <input type="text" name='productName' ref={productName} /><br /> <br />
                price <input type="text" name='price' ref={price} /><br /><br />
                <button onClick={addProduct}>submit</button><br /><br />
            </div>
            <div className="box">
                <h1>update</h1>
                name <input type="text" name='productName' value={view.productName} onChange={handle} /><br /><br />
                price <input type="text" name='price' value={view.price} onChange={handle} /><br /><br />
                <button onClick={save}>submit</button><br /><br />
            </div>

            <table border="1px" cellPadding="10px" cellSpacing="1px">
                <thead>
                    <tr>
                        <th>product</th>
                        <th>price</th>
                        <th>delete</th>
                        <th>update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((val, ind) => (
                            <tr key={ind}>
                                <td>{val.productName}</td>
                                <td>{val.price}</td>
                                <td><button onClick={() => remove(ind)}>delete</button></td>
                                <td><button onClick={() => update(val.productName, val.price, ind)}>update</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Local
