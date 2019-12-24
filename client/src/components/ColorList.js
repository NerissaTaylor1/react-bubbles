import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if (colorToEdit.id === color.id) {
            return color = res.data
          } else {
            return color
          }
        }))
        props.history.push("/protected");

      })
      .catch(err => console.log(err.response));

  };


  // const deleteColor = (e, colors, colorToEdit, color, props, id) => {




  // make a delete request to delete this color

  //   axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)

  //     .then(res => {
  //       updateColors(colors.filter(color => { return `${color.id}` !== colorToEdit.id }))
  //       this.history.push('/');
  //       // setColorToEdit(res.data)
  //     })
  //     .catch(err => console.log(err))

  // }

  // const colors = props.colors.find(
  //   thing => `${thing.id}` === props.match.params.id
  // );

  const deleteColor = id => {


    // const colors = Object.assign([], colorToEdit)
    // colors.splice(index, 1);
    // setColorToEdit({ colors: colors })
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${id}`)
      .then(res => {
        updateColors(colors.filter(color => {
          return color.id !== id;
        }))

        props.history.push('/protected');
      })
  }

  // console.log(res);
  // updateColors({
  //   colorToEdit: colors.filter(color => {
  //     if (color.id !== id) {
  //       return color;
  //     }
  //   })
  // })
  // updateColors(colors.filter(color => color.id !== id))
  // })




  if (!colors) {
    return <div>Loading colors info...</div>
  }

  return (


    <div className="colors-wrap">
      <p>colors</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color.id)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>

  );
};

export default ColorList;
