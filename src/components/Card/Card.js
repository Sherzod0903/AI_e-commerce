import { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import React from "react";
import { toast } from "react-toastify";

const Card = () => {
  const [mainCard, setmainCard] = useState([]);
  const [card, setCard] = useState([]);
  const [isModale, setisModale] = useState(false);
  const addCartHandler = (item) => {
    setCard((prev) => {
      return [...prev, item];
    });
    toast.dark("Product added succesully");
  };
  const modalHandler = () => {
    setisModale(!isModale);
  };
  useEffect(() => {
    alanBtn({
      key: "9d9b341b12cb4183896f52ce687e1fd22e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setmainCard(commandData.data);
        } else if (commandData.command === "showCart") {
          addCartHandler(commandData.data);
        } else if (commandData.command === "openCart") {
          setisModale(commandData.data);
        } else if (commandData.command === "close") {
          setisModale(commandData.data);
        }
        console.log(commandData);
      },
    });
  }, []);
  return (
    <div className="album py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mainCard.map((item) => (
            <div key={item.id} className="col">
              <div className="card shadow-sm p-3 ">
                <div className="card-title">
                  <h4 className="text-muted text-center">Product #{item.id}</h4>
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="bg-placeholder card-image-top"
                  width="100%"
                  height="400px"
                />
                <div className="card-body">
                  <p className="card-text">{item.title.slice(0, 20)}</p>
                  <p className="card-text fw-lighter">
                    {item.description.slice(0, 100)}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <span>{item.category}</span>
                  </div>
                  <span className="text-category">${item.price}</span>
                </div>
                <button
                  onClick={() => addCartHandler(item)}
                  className="mt-3 btn btn-outline-primary">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed-top m-3">
        <button
          onClick={modalHandler}
          type="button"
          className="btn btn-primary position-relative">
          Card
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {card.length}
            <span className="visually-hidden">unread messages</span>
          </span>
        </button>
      </div>
      {isModale && (
        <div
          className="modal"
          style={{ display: "block", background: "rgba(0,0,0,.8)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button
                  onClick={modalHandler}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {card.map((item) => (
                  <div key={item.id} className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text text-muted">
                            {item.description.slice(0, 100)}
                          </p>
                          <p className="card-text">
                            <small className="text-muted">$ {item.price}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  onClick={modalHandler}
                  type="button"
                  className="btn btn-primary">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;
