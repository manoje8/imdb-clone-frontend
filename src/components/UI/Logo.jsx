const Logo = () => {

    const logoStyle = {
        fontWeight: 700,
        border: '1px solid #FFD814',
        backgroundColor: '#f3ca02',
        padding: '2px 4px',
        borderRadius: '4px',
    }

    return (
    <h2 className="logo" style={logoStyle}><a href="/">IMDb</a></h2>
)
}
export default Logo