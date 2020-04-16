import React, {useState} from 'react'
import { useDispatch,useSelector} from 'react-redux';
//actions from redux
import {crearNuevoProductoAction} from '../actions/productoActions'
import {mostrarAlerta,ocultarAlertaAction} from '../actions/alertaActions';

const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //usando dispatch y crea una funcion 
    const dispatch = useDispatch();

    //acceder al state el store, y se accede a sus atributos como un objeto
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    console.log(cargando)

    //manda a llamar el action en productoAction
    const agregarProducto = (producto) => dispatch( crearNuevoProductoAction(producto) ); 

    //submit del nuevo producto
    const submitNuevoProducto = e => {
        e.preventDefault();

        //valdiar form
        if (nombre.trim() === '' || precio <= 0 ){

            const alerta = {
                msg: 'ambos campos son oblitarios',
                classes: 'alert alert-danger text-center text-uppercase p3',                
            }
            dispatch( mostrarAlerta(alerta) );

            return;
        }

        //si no hay errores

        dispatch( ocultarAlertaAction() );

        // crear el new product
        agregarProducto({
            nombre,
            precio
        });

        history.push('/');
    }

    return (
        <div className="row justify-content-center ">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">                                                
                        <h2 className="text-center mb-4 font-weight-bold"> 
                            Agregar nuevo NuevoProducto
                        </h2>

                        {alerta ? <p className={alerta.classes}> {alerta.msg} </p> : null  }

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="nombre producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}

                                /> 

                                <label>precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="precio producto"
                                    name="precio"
                                    value={precio}
                                    onChange={e => guardarPrecio(Number(e.target.value))}                                    
                                /> 
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {cargando ? <p>Cargando ... </p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center"> ERROR</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;