import { useState, useEffect } from '@wordpress/element';
import { ComboboxControl, Spinner, Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';

const MultiPackageMetaControl = () => {
	const [ searchTerm, setSearchTerm ] = useState('');

	// Leer y escribir en el post actual
	const meta = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('meta');
	}, []);

	const { editPost } = useDispatch('core/editor');

	// Obtener la lista actual de IDs desde el meta __packages
	const selectedPackages = meta?.__packages || [];

	// Cargar los paquetes desde la API para buscarlos
	const packages = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'packages', {
				per_page: 20,
				search: searchTerm,
			});
		},
		[ searchTerm ]
	);

	if (packages === undefined) {
		return <Spinner />;
	}

	// Mostrar solo paquetes que no están seleccionados
	const options = (packages || [])
		.filter((pkg) => !selectedPackages.includes(pkg.id))
		.map((pkg) => ({
			label: `${pkg.title.rendered} (ID: ${pkg.id})`,
			value: pkg.id,
		}));

	// Agregar un paquete al meta
	const handleSelect = (id) => {
		if (!selectedPackages.includes(id)) {
			editPost({
				meta: {
					__packages: [...selectedPackages, id],
				},
			});
		}
	};

	// Quitar un paquete del meta
	const removePackage = (idToRemove) => {
		editPost({
			meta: {
				__packages: selectedPackages.filter((id) => id !== idToRemove),
			},
		});
	};

	// Obtener título de los seleccionados para mostrar
	const selectedObjects = (packages || []).filter((pkg) =>
		selectedPackages.includes(pkg.id)
	);

	return (
		<div>
			<ComboboxControl
				label="Buscar paquetes"
				value={null}
				options={options}
				onInputChange={(value) => setSearchTerm(value)}
				onChange={handleSelect}
			/>

			{selectedPackages.length > 0 && (
				<div style={{ marginTop: '1em' }}>
					<strong>Paquetes seleccionados:</strong>
					<ul>
						{selectedObjects.map((pkg) => (
							<li key={pkg.id}>
								{pkg.title.rendered} (ID: {pkg.id}){' '}
								<Button
									isLink
									isDestructive
									onClick={() => removePackage(pkg.id)}
								>
									Quitar
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MultiPackageMetaControl;
