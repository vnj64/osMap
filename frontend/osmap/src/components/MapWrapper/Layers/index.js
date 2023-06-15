import ViewPorts from "./ViewPorts";
import ViewRails from "./ViewRails";

const Layers = ({map}) => {

    
    return (
        <>
            <ViewPorts map={map} />
            <ViewRails map={map} />
        </>
    );
}

export default Layers;