import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Delete, Edit } from "@material-ui/icons";
import moment from "moment";

import axios from "axios";

export default function NewPaste() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/getall").then((res) => {
      setPastes(res.data);
    });
  }, []);
  const handleDelete = (idx) => {
    console.log(idx);
    axios
      .delete(`http://localhost:5000/delete/${idx}`)
      .then((res) => {
        const newPastes = pastes.filter((paste) => {
          return paste._id !== idx;
        });
        console.log(newPastes);
        setPastes(newPastes);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const editPaste = async (title, paste, idx) => {
    // API Call
    const response = await axios.put(`http://localhost:5000/edit/${idx}`, {
      body: JSON.stringify({ title, paste }),
    });

    let newPastes = JSON.parse(JSON.stringify(pastes));
    // Logic to edit in client
    for (let index = 0; index < newPastes.length; index++) {
      const element = newPastes[index];
      if (element.idx === idx) {
        newPastes[index].title = title;
        newPastes[index].paste = paste;
        break;
      }
    }
    setPastes(newPastes);
  };
  const [paste, setPaste] = useState([]);
  const onChange = (e) => {
    console.log(e.target.value);
    setPaste({ ...paste, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3>Latest Pastes</h3>
      {pastes.length ? (
        <ul className="collection">
          {pastes.map((paste, idx) => {
            let pasteLink = "http://localhost:3000/paste/" + paste.idx;

            return (
              <li className="collection-item" key={idx}>
                {paste.title} on {moment(paste.createdAt).format("lll")}{" "}
                <a href={pasteLink}>Goto Paste</a>
                <Edit onClick={toggleModal} />
                <Modal
                  isOpen={isOpen}
                  onRequestClose={toggleModal}
                  contentLabel="My dialog"
                >
                  <div>
                    <div>
                      <h5>Edit Paste</h5>
                    </div>
                    <div>
                      <form>
                        <div>
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={paste.title}
                            onChange={(e) => {
                              setPaste({
                                ...paste,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            minLength={4}
                            required
                          />
                        </div>
                        <div>
                          <label>Paste</label>
                          <input
                            type="text"
                            name="paste"
                            value={paste.paste}
                            onChange={(e) => {
                              setPaste({
                                ...paste,
                                [e.target.name]: e.target.value,
                              });
                            }}
                            minLength={5}
                            required
                          />
                        </div>
                      </form>
                    </div>
                    <div>
                      <button
                        disabled={
                          paste.title.length < 4 || paste.paste.length < 5
                        }
                    
                       
                        type="button"
                      >
                        Update PAste
                      </button>
                      <button onClick={toggleModal}>Close </button>
                    </div>
                  </div>
                </Modal>
                <Delete onClick={() => handleDelete(paste._id)} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h5>No Pastes Exists</h5>
      )}
    </div>
  );
}
