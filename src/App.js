import { useState } from 'react';
import { elements } from './quimic-elements';


function Tabla({ mipropiedad }) {

  return (
    <div className="container sm-auto px-100 pt-10 rounded-sm ">
      <table className="border-collapse border border-slate-500  px-2 w-full">
        <thead>
          <tr className=' pr-28'>
            <th className="border border-slate-600  border-collapse">#</th>
            <th className="border border-slate-600 border-collapse  px-2">Atomo</th>
            <th className="border border-slate-600  border-collapse px-2">Masa molecular MM</th>
            <th className="border border-slate-600  border-collapse px-2">% de masa molecular </th>
            <th className="border border-slate-600  border-collapse px-2">Masa Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {mipropiedad.map((fila, key) => {
            return (
              <tr key={fila.id}>
                <td className="border border-slate-700  px-2">{fila.numero}</td>
                <td className="border border-slate-700  px-2">{fila.letra}</td>
                <td className="border border-slate-700  px-2">{fila.masamolecular}</td>
                <td className="border border-slate-700  px-2">{fila.masatotal}</td>
                <td className="border border-slate-700  px-2">{fila.masasubtotal}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}


export default function List() {
  const [totalMass, setTotalMass] = useState(0);
  const [input, setInput] = useState([{ id: Date.now(), letra: '', numero: 1 }]);

  const [formula, setFormula] = useState([]);


  function calculateMolecularMass() {
    try {
      const formulaResult = []

      input.forEach(singleInput => {
        const elementFinded = elements.find(element => element.symbol === singleInput.letra)
        if (!elementFinded) {
          throw new Error(`No se encontro el elemento ${singleInput.letra}`)
        }
        const singleInputAtomicNumber = parseInt(singleInput.numero)
        if (isNaN(singleInputAtomicNumber)) {
          throw new Error(`No es un numero atomico valido ${singleInput.numero}`)
        }

        formulaResult.push({
            id: singleInput.id,
            letra: singleInput.letra,
            numero: singleInput.numero,
            masamolecular: elementFinded.atomic_mass,
            masatotal: 23,
            masasubtotal: singleInputAtomicNumber * elementFinded.atomic_mass
        })
      })

      const totalMass = formulaResult.reduce((previusSum, singleResult) => {
        return previusSum + singleResult.masasubtotal
      }, 0)

      formulaResult.forEach(singleResult => {
        singleResult.masatotal = (singleResult.masasubtotal / totalMass) * 100
      })

  
      setTotalMass(totalMass)
      setFormula(formulaResult)
    } catch (error) {
      alert(error.message)
    }
  }

  function addInputEmpty() {
    setInput(valor => {
      return [
        ...valor, {
          id: Date.now(),
          letra: '',
          numero: 1
        }]
    })
  }


  function handleDeleteTask() {
    setInput([{
      id: Date.now(),
      letra: '',
      numero: 1
    }]);
  }


  return (
    <div className='bg-slate-300 h-[100vh]'>
      <div className="container mx-auto">
      <div >
        <h1 className='font-sans text-lg  pt-3' >Calculadora de Peso Molecular</h1>
        <p className='pt-9 text-justify'>   Calculadora de Peso Molecular
          Esta calculadora en línea se puede utilizar para calcular el peso molecular medio (MW) de las moléculas introduciendo las fórmulas químicas (por ejemplo, C3H4OH(COOH)3). O puede elegir por una de las siguientes dos listas de opciones, que contienen una serie de compuestos orgánicos comunes (incluida su fórmula química) y todos los elementos. La calculadora de masa molecular reconocerá las fórmulas ingresadas, que están incluidas en la lista de compuestos orgánicos.
          La calculadora maneja como máximo dos niveles de soporte diferentes. Asegúrese de ingresar la molécula de cristalización al final (por ejemplo, C2HCl3O.H2O</p>
        <div className="flex pt-4 items-center">

          <div className='text-lg mr-4'>Formula Quimica: </div>

          <div className='flex  '> {input.map((valores) => {
            return (
              <div key={valores.id} className="flex  pt-4 mr-1 ">
                <div >
                  <input value={valores.letra}
                    onInput={(e) => {
                      const modificado = input.map((ob) => {
                        if (ob.id === valores.id) {
                          ob.letra = e.target.value
                        }
                        return ob
                      })
                      setInput(modificado)
                    }
                    }
                    className='rounded-md focus-visible:outline-none w-8 ' />
                </div>

                <div >
                  <input value={valores.numero}
                    onInput={(e) => {
                      const modificado = input.map((ob) => {
                        if (ob.id === valores.id) {
                          ob.numero = e.target.value
                        }
                        return ob
                      })
                      setInput(modificado)
                    }
                    }
                    className='rounded-md focus-visible:outline-none w-6 relative top-5 pl-1  font-mono'>
                  </input>
                </div>
              </div>
            );
          })
          }

          </div>

          <div >
            <button
              className=' bg-sky-400 rounded-full  hover:bg-sky-500 mr-4 w-[20px] h-[20px] leading-none'
              onClick={addInputEmpty}
            >+
            </button>
          </div>

          <div >
            <button
              className='mt-1 ml-1 bg-sky-400 rounded-lg  px-3 hover:bg-sky-500 w-20 mr-4 '
              onClick={calculateMolecularMass}
            >Calcular</button>
          </div>

          <div >
            <button
              className='mt-1 ml-1 bg-sky-400 rounded-lg  px-3 hover:bg-sky-500 w-20 mr-4 '
              onClick={handleDeleteTask}
            >eliminar</button>
          </div>
        </div>

      </div>

      <Tabla mipropiedad={formula} />

      <div className="flex pt-4 justify-between">

        <div className='font-serif text-lg mr-60'>Total de Masa Molecular </div>
        <div >
          <input disabled className='rounded-md focus-visible:outline-none w-28   relative'
            value={totalMass} ></input>
        </div>
      </div>
    </div>
    </div>
  );
}
