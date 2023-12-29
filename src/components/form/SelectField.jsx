import { useTranslation } from 'react-i18next'

function SelectField ({ properties, onChange }) {
  // Data
  const { t } = useTranslation()

  // fucntion
  function onFieldChanged (e) {
    e.preventDefault()
    onChange(properties.id, e.target.value)
  }

  return (
    <div className="py-2">
      <span className="px-1 text-sm text-gray-600">{ t(properties.label) }</span>
      <select 
        type="text"
        name={properties.id + '-field'}
        id={properties.id + '-field'}
        onChange={onFieldChanged}
        className="text-md block px-3 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none" 
      >        
        {properties.options.map((option, index) => (
          <option key={index} value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectField


