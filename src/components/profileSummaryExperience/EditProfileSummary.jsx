import styles from './profileSummaryExperience.module.scss'

import React, { useEffect } from 'react'
import useSystemStore from '../../hooks/storeSystem'
import Button from '../button/Button'
import CloseButton from '../closeButton/CloseButton'
import BottomSheets from '../bottomSheets/BottomSheets'

const EditProfileSummary = (props) => {
	const { isEditProfile, setIsEditProfile } = props
	const { userLogged, setUserLogged } = useSystemStore()
	const { backgroundColor, backgroundImage } = userLogged
	const colors = [
		"linear-gradient(45deg, #3095b359, #dc1919b5)",
		"linear-gradient(45deg, #3095b359, #81127eb5)"
	]

	const backgrounds = [
		"/images/backgrounds/bg-gamer.jpg",
		"/images/backgrounds/bg-profile-01.svg",
		"/images/backgrounds/dog-and-guy.png"
	]

	const handleChange = (data) => {
		setUserLogged(data);
	}

	useEffect(() => {
		const source = document.getElementById("draggable");
		// source.addEventListener("drag", (event) => {
		// 	console.log("dragging");
		// });
	}, [])

	return <div className={`${isEditProfile ? styles.active : ''} ${styles.EditProfileSummary}`}>
		<BottomSheets isBottomSheets={isEditProfile} setIsBottomSheets={setIsEditProfile}>
			{/* <CloseButton onClick={() => setIsEditProfile(false)} /> */}
			<div className={styles.borderColor}>
				<label htmlFor="">Color del borde</label>
				<div className={styles.items}>
					{colors.map(item => {
						return <div
							className={`${backgroundColor == item ? styles.selected : ''} ${styles.item}`}
							onClick={() => handleChange({ backgroundColor: item })}
							style={{ background: item }}></div>
					})}
				</div>
			</div>
			<hr />
			<div className={styles.backgroundImage}>
				<label>Fondo</label>
				<div className={styles.items}>
					{
						backgrounds.map(item => {
							return <div
								className={`${backgroundImage == item ? styles.selected : ''} ${styles.item}`}
								onClick={() => handleChange({ backgroundImage: item })}>
								<img src={item} alt="" />
							</div>
						})
					}
				</div>
			</div>
			{/* <div className={styles.actions}>
			<Button color="blue">Guardar</Button>
		</div> */}
		</BottomSheets>
	</div>
}

export default EditProfileSummary
