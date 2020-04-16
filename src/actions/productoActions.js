import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTO,
    DESCARGA_PRODUCTO_ERROR,
    DESCARGA_PRODUCTO_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2';

//crear nuevos producto

export function crearNuevoProductoAction(producto){
    return async (dispatch) => {    
        dispatch( agregarProducto());

        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto);

            //Si todo sale bieen, actualiza el state
            dispatch( agregarProductoExito(producto) )
            Swal.fire(
                'Correct',
                'El preducto se agrego de pana',
                'success'
            )

        } catch (error) {
            console.log(error);
            //si hay error, cambia el state
            dispatch( agregarProductoError(true))
            Swal.fire({
                icon:'error',
                title: 'Cago compa',
                text: 'intenta de nuevo'
            })
        }
        
    }
}

const agregarProducto = () => ({
    type:AGREGAR_PRODUCTO   
})

// si se guarda en el bbdd 

const agregarProductoExito = producto => ({
    type:AGREGAR_PRODUCTO_EXITO,
    payload:producto    
})

// si hay error al gaurdar

const agregarProductoError = estado => ({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:estado
})

// funcion qe descarga los datos desde la BBDD

export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());

        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch( descargarProductosExitosa(respuesta.data))
            
        } catch (error) {
            dispatch (descargarProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTO,
    payload: true 
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTO_EXITO,
    payload: productos
})

const descargarProductosError = estado => ({
    type:DESCARGA_PRODUCTO_ERROR,
    payload:true
})

export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            Swal.fire(
                'borrado',
                'se murio bien',
                'success'
            )
        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type:OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload:true
})

//colocar producto en edicion 

export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch ( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = producto => ({  
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto 
})


//editar registro en la API y state

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto() )
        try {
            clienteAxios.put(`/productos/${producto.id}`,producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            dispatch( editarProductoError() );
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})