interface InsideNavbarProps {
    text: string;
    onClick: () => void;
}

export function InsideNavbar(props: InsideNavbarProps) {
    return (
        <div className="opacity-100 h-8 border-none">
            <span className="text-[#888BAF] drop-shadow-2xl font-semibold cursor-pointer" onClick={() => { props.onClick(); }}>
                {props.text} {props.text !== "" ? "/" : ""}
            </span>
        </div>
    )
}