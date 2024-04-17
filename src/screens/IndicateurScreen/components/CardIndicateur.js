import React, { useState } from 'react'

import RenderGraphiqueTab from './_parcials/RenderGraphiqueTab'
import RenderNombreTab from './_parcials/RenderNombreTab'
import TabView from './TabView'
import { CALANDAR_CONFIG } from '../../../config';
export const IndicateurContext = React.createContext();

const CardIndicateur = ({
    data,
    selectedDossier,
    exercices
}) => {
    const [filter, setFilter] = useState({
        active: {
            value: CALANDAR_CONFIG.YEARS
        },
        yearsIndex: exercices.findIndex((year) => year === new Date().getFullYear() - 1)
    })

    return (
        <IndicateurContext.Provider value={{data, filter, setFilter, selectedDossier}}>
            <TabView
                items={['Graphique', 'Chiffre']}
                data={data}
            >
                <RenderGraphiqueTab
                    data={data}
                    exercices={exercices}
                />
                <RenderNombreTab
                    data={data}
                    exercices={exercices}
                />
            </TabView>
        </IndicateurContext.Provider>
      
    )
}


export default CardIndicateur