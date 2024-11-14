'use client'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowDownAZ, ArrowDownZA, CircleChevronLeft, CircleChevronRight, ClockArrowDown, ClockArrowUp, RefreshCcw, Search } from "lucide-react";
import { useFormStatus } from 'react-dom'


const classSort = "size-10 p-2 text-white rounded-full bg-blue-100 hover:cursor-pointer hover:bg-blue-300 peer-checked:bg-blue-400 peer-checked:duration-[1s]"


export default function Filtrar({ totalPages, query, sort, page }) {

    const router = useRouter()
    const pathname = usePathname()
    const { pending } = useFormStatus()


    function updatePage({ query, sort, page }) {
        const params = new URLSearchParams()

        params.set('query', query ?? '')
        params.set('sort', sort ?? 'createdAt desc')
        params.set('page', page ?? 1)

        router.replace(pathname + '?' + params.toString());
    }


    return (
        <>
            <div className="flex justify-end items-center gap-1 mb-10">
                {/* Ordenar */}

                <label title="NOMBRE A->Z">
                    <input
                        type="radio" name="sort"
                        value='nombre asc'
                        checked={sort == 'nombre asc'}
                        onChange={(e) => updatePage({ query, page, sort: e.target.value })}
                        className="hidden peer"
                    />
                    <ArrowDownAZ className={classSort} />
                </label>

                <label title="NOMBRE Z->A">
                    <input
                        type="radio" name="sort"
                        value='nombre desc'
                        checked={sort == 'nombre desc'}
                        onChange={(e) => updatePage({ query, page, sort: e.target.value })}
                        className="hidden peer"
                    />
                    <ArrowDownZA className={classSort} />
                </label>

                <label title="CREADO 0->9">
                    <input
                        type="radio" name="sort"
                        value='createdAt asc'
                        checked={sort == 'createdAt asc'}
                        onChange={(e) => updatePage({ query, page, sort: e.target.value })}
                        className="hidden peer"
                    />
                    <ClockArrowDown className={classSort} />
                </label>

                <label title="CREADO 9->0">
                    <input
                        type="radio" name="sort"
                        value='createdAt desc'
                        checked={sort == 'createdAt desc'}
                        onChange={(e) => updatePage({ query, page, sort: e.target.value })}
                        className="hidden peer"
                    />
                    <ClockArrowUp className={classSort} />
                </label>

                {/* Buscar */}
                <label title="BUSCAR..." className='relative flex items-center'>
                    <input
                        type='search' name="query"
                        placeholder="Buscar ..."
                        onChange={(e) => updatePage({ query: e.target.value })}
                        defaultValue={query}
                        className='peer text-black p-2 pl-10 rounded-full  border-2 border-blue-400 focus:outline-blue-500'
                    />
                    <Search className="absolute left-3 text-blue-700 size-4"  />
                </label>
            </div>


            {/* Paginar */}
            <div>
                <div className="flex justify-between items-center rounded-full border border-slate-200 bg-blue-400">

                    <button
                        disabled={page <= 1}
                        onClick={() => { document.getElementById('page').value = +page - 1 }}
                        className={`flex gap-1 items-center rounded-full text-white bg-blue-500 hover:bg-blue-700 disabled:bg-slate-300`}
                    >
                        <CircleChevronLeft className="size-10" />
                    </button>

                    <div>
                        {pending
                            ? <RefreshCcw className='w-14 inline text-white animate-spin self-center' />
                            : <input
                                id='page'
                                name="page"
                                value={page}
                                readOnly={true}
                                className='w-14 font-bold text-center text-white rounded-md bg-inherit disabled:bg-slate-300 focus:outline-none'
                            />
                        }
                    </div>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => { document.getElementById('page').value = +page + 1 }}
                        className={`flex gap-1 items-center rounded-full text-white bg-blue-500 hover:bg-blue-700 disabled:bg-slate-300`}
                    >
                        <CircleChevronRight className="size-10" />
                    </button>
                </div>

                {/* Lista de páginas */}
                <div className="flex flex-nowrap mb-1 overflow-x-auto mx-10">
                    {
                        [...Array(totalPages).keys()].map(i =>
                            <button
                                key={i}
                                onMouseDown={(e) => e.target.classList.replace('bg-blue-100', 'bg-blue-300')}
                                onClick={() => { document.getElementById('page').value = i + 1 }}
                                className={`inline shrink-0 w-16 h-8 border bg-blue-100 border-slate-100 hover:bg-blue-300 ${page == i + 1 && 'bg-blue-400 font-bold text-white'}`}
                            >
                                {i + 1}
                            </button>
                        )
                    }

                </div>
            </div>
        </>
    );
}

