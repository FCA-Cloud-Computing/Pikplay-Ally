import './gallery.scss'

import Zoom from 'react-medium-image-zoom'

const GalleryComponent = (props) => {
    const { items, title } = props

    return <div className="GalleryComponent">
        <h2>{title}</h2>
        <div className="items">
            {
                items && items.map(item => {
                    return <Zoom>
                        <img className="item" src={item} />
                    </Zoom>
                })
            }
        </div>
    </div>
}

export default GalleryComponent
