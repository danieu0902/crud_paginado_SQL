'use client'
import { eliminarProducto } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { CircleCheck, CircleX, RefreshCcw, Trash } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';


export default function ProductoEliminar({ producto = {} }) {
    const formId = useId()
    const [state, action, pending] = useActionState(eliminarProducto, null)


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} >
            <h1 className='text-red-700 text-xl font-bold text-center'>Eliminar producto</h1>

            {state?.success &&
                <p className='bg-green-100 text-green-700 mb-2 p-3 rounded-md flex gap-2 items-center animate-hide'>  {/* consultar archivo tailwind.config.js */}
                    <CircleCheck /> {state?.success}
                </p>
            }
            {state?.error &&
                <p className='bg-red-100 text-red-700 mb-2 p-3 rounded-md flex gap-2 items-center animate-hide'>  {/* consultar archivo tailwind.config.js */}
                    <CircleX /> {state?.error}
                </p>
            }
            <div className='text-lg mb-4 w-full grid grid-cols-1 md:grid-cols-[100px_auto] items-center gap-4 p-6 rounded-lg border-2 border-zinc-200'>

                <input type="hidden" name="id" value={producto?.id} />

                <label htmlFor="nombre"> Nombre </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    defaultValue={producto.nombre}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled
                    required
                />

                <label htmlFor="descripcion"> Descripción </label>
                <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    defaultValue={producto.descripcion}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled
                    required
                />

                <label htmlFor="precio"> Precio </label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    defaultValue={producto.precio}
                    step={0.01}
                    className='bg-zinc-100 p-2 rounded hover:ring-1 focus:outline-none disabled:bg-zinc-400 disabled:text-zinc-200'
                    disabled
                    required
                />

                <Image src={producto.imagen || '/images/no-image.png'} alt="" width={400} height={400} className='mx-auto md:col-span-2 w-[400px] h-[300px] object-cover' />
                <input
                    type="hidden"
                    id="imagen"
                    name="imagen"
                    defaultValue={producto?.imagen}
                    disabled={pending}
                />

                <button type="submit" disabled={pending}
                    className='md:col-span-2 mt-6 w-full p-3 bg-red-700 text-white disabled:bg-zinc-400 font-bold text-center rounded-md'
                >
                    {pending
                        ? <div><RefreshCcw className='inline animate-spin' /> Eliminado...</div>
                        : <div><Trash className='inline' /> Eliminar</div>

                    }
                </button>

            </div>
        </form>
    )
}

