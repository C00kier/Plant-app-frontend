import './SettingsButton.css'

export default function SettingsButton({ filter }: { filter: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> }) {
    return (
        <>
            <div id='settings-container'>
                <select id='filter-select' onChange={filter}>
                    <option value="0">Filtruj..</option>
                    <option value="1" className='filter-option'>Światłolubne</option>
                    <option value="2" className='filter-option'>Częściowo nasłonecznione</option>
                    <option value="3" className='filter-option'>Cieniolubne</option>
                    <option value="4" className='filter-option'>Dla początkujących</option>
                    <option value="5" className='filter-option'>Dla zaawansowanych</option>
                    <option value="6" className='filter-option'>Dla expertów</option>
                    <option value="7" className='filter-option'>Oczyszczające powietrze</option>
                    <option value="8" className='filter-option'>Bezpieczne dla dzieci</option>
                    <option value="9" className='filter-option'>Bezpieczne dla zwierząt</option>
                </select>
            </div>
        </>
    )

}