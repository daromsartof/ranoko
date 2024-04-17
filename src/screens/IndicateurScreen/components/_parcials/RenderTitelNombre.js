import { Text } from '@rneui/themed'
import React, { useMemo } from 'react'
import { CALANDAR_CONFIG } from '../../../../config'

const RenderTitelNombre = ({
  isComparaison,
  item,
  filter,
  indicateur,
  description,
  isCummule
}) => {
  const isCurrentYear = useMemo(() => indicateur.datas.at(0)?.name === new Date().getFullYear() && filter.active.value === CALANDAR_CONFIG.YEARS, [indicateur.categories.at(-1)])

  const renderText = useMemo(() => {
    if (isComparaison) {
      return `${item.name} ${indicateur.categories.at(-1).slice(0, -4)}`
    } else {
      return `${description} ${isCurrentYear ? indicateur.datas.at(0)?.name : indicateur.categories.at(-1)}`
    }
  }, [isComparaison])
  
  return (
    <Text style={{
      textAlign: "center"
    }}>{renderText}
      <Text style={{
        fontWeight: "bold",
        color: "red",
        textDecorationStyle: "solid",
        textDecorationColor: "red",
        textDecorationLine: "underline"
      }}>{isCummule ? ' en cumul ' : ''}</Text>
    </Text>
  )
}

export default RenderTitelNombre