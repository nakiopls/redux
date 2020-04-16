import React from 'react';
import {useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import {borrarProductoAction,obtenerProductoEditar} from '../actions/productoActions';

const Producto = ({producto}) => { 
    const {nombre,precio,id} = producto

    const dispatch = useDispatch();
    const history = useHistory(); //habilitar history para redireccion 

    const confirmarEliminarProducto = id => {

        Swal.fire({
            title:'seguro?',
            text: "nos e podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, borrar',
            cancelButtonText: 'cancelar '
        }).then((result) => {
            if (result.value) {
                //Pasar al action
                dispatch( borrarProductoAction(id) );
            }
        })         
    }

    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/producto/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td> <span className="font-weight-bold"> $ {precio} </span></td> 
            <td className="acciones">  
                <button 
                    type="button" 
                    onClick={() => redireccionarEdicion(producto)}
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarProducto(id)}
                > Eliminar</button>
            </td>
        </tr>
    );
}

export default Producto;