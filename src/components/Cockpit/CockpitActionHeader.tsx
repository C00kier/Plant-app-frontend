import "./Cockpit.css";

export default function CockpitActionHeader({timePeriod}) {
    return (
        <>
            <div className="grid-action-container-header">
                <span>{timePeriod}</span>
                <span>Akcja</span>
            </div>
            <hr></hr>
        </>
    )
}