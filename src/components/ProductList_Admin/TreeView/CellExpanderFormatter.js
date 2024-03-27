import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import useFocusRef from '~/hooks/useFocusRef';

function CellExpanderFormatter({ isCellSelected, expanded, onCellExpand }) {
    const { ref, tabIndex } = useFocusRef(isCellSelected);

    const handleKeyDown = (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onCellExpand();
        }
    };

    return (
        <div className="cellExpandClassname">
            <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
                <span ref={ref} tabIndex={tabIndex}>
                    {expanded ? (
                        <AddIcon
                        //   style={{
                        //     fontSize: "18px",
                        //     color: "#a8a8a8",
                        //     marginRight: 5,
                        //     marginLeft: 5
                        //   }}
                        />
                    ) : (
                        <RemoveIcon
                        //   style={{
                        //     fontSize: "18px",
                        //     color: "#a8a8a8",
                        //     marginRight: 5,
                        //     marginLeft: 5
                        //   }}
                        />
                    )}
                </span>
            </span>
        </div>
    );
}

export default CellExpanderFormatter;
