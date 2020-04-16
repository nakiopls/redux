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
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

} from '../types';
//Cada reducers tiene su propio state

const initialState = {
    productos: [],
    error: null,
    loading: false,
    produnctoeliminar: null,
    productoeditar: null
}

export default function (state =initialState,action) {
    switch (action.type) {
        case COMENZAR_DESCARGA_PRODUCTO: 
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading:action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                productos: [...state.productos,action.payload]
            }   
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTO_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }   
        case DESCARGA_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                error: null,
                productos:action.payload 
            }        
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                produnctoeliminar: action.payload
            }    
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.produnctoeliminar),
                produnctoeliminar: null
            }    
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar: action.payload
            } 
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productoeditar: null,
                productos: state.productos.map( producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto 
                )
            }                                         
        default:
            return state;
    }
}