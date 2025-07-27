// import { useEffect } from 'react';
import { Container, Box, Typography, Grid, Stack, Chip, Card, CardContent, Avatar } from '@mui/material';
import {
	Star,
	HomeWork,
	OutdoorGrill,
	Coffee,
	Fastfood,
	Wifi,
	ElectricalServices,
	FamilyRestroom,
	Accessible,
	AccountBalance,
	LocalHospital,
	Mosque,
	LocalMall,
	CreditCard,
	AttachMoney,
} from '@mui/icons-material';
import Wave from '../src/assets/images/wave.svg';
import type { Cafe, Filter, Cafes } from './models/Cafe';

const placeFilters: Filter = { Indoor: true, Outdoor: true, Coffee: true, NonCoffee: true, Rice: true, Snack: true, Wifi: true, Electricity: true, Mushala: true, KidsFriendly: true, Accessible: true, Cash: true, NonCash: true };

export default function CafeCard({ cafes }: { cafes: Cafes }) {
	console.log('test cl', cafes);
  return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				bgcolor: 'white',
				width: '100vw',
				minHeight: '100vh',
			}}
		>
			<Box
				sx={{
					position: 'relative',
					height: '320px',
					width: '100%',
					backgroundImage: `url(${Wave})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 4, md: 8 }, pb: 2 }}>
					<Stack>
						<Typography variant="h4" sx={{
							fontWeight: 'bold',
							mb: 1,
							color: 'primary.secondary',
							fontSize: { xs: '1.75rem', md: '2.125rem' }
						}}>
							Nearby Cafe
						</Typography>
						<Typography variant="h5" sx={{
							fontWeight: 'bold',
							mb: 2,
							color: 'primary.secondary',
							fontSize: { xs: '0.75rem', md: '1.25rem' }
						}}>
							Find the best cafes near you. Perfect for working from a cafe, catching up with friends, or having a good time with family.
						</Typography>
					</Stack>
					<Stack 
						direction={{ xs: 'column', sm: 'row' }} 
						spacing={1} 
						sx={{ 
							mt: 2,
							flexWrap: 'wrap',
							gap: 1
						}}
					>
						{Object.entries(placeFilters)
							.slice(0, 5)
							.map(([filter, isActive]) => (
								isActive && (
									<Chip
										key={filter}
										label={filter}
										sx={{
											backgroundColor: '#E8DEF8',
											color: '#1D192B',
											fontWeight: 'bold',
											width: { xs: '100%', sm: 'auto' }
										}}
									/>
								)
							))}
						<Chip
							key='more-btn'
							label='more filters +'
							sx={{
								backgroundColor: 'black',
								color: 'white',
								fontWeight: 'bold',
								width: { xs: '100%', sm: 'auto' },
								cursor: 'pointer',
							}}
						/>
					</Stack>
				</Container>
			</Box>
			<Container maxWidth="lg" sx={{ position: 'relative', pt: 4, pb: 2, mt:'-90px' }}>
				{
				cafes.length === 0 ? (
					<Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
						Please wait
					</Typography>
				) : (
					cafes.map((cafe: Cafe) => (
					<Box
						sx={{
							position: 'relative',
							bgcolor: 'black',
							borderRadius: '24px',
							boxShadow: 2,
							width: '100%',
							display: 'flex',
							justifyContent: 'end',
							flexDirection: 'column',
							mb: 4,
						}}
					>
						<Typography sx={{ fontWeight: 'bold', mb: 2, color: 'primary.secondary', textAlign: 'center', mt: '10px' }}>
							{cafe.conclusion}
						</Typography>
						<Card sx={{ borderRadius: '16px', p: 2 }}>
							<CardContent>
								<Stack spacing={2.5}>
									{/* Header Section */}
									<Stack direction="row" spacing={2} alignItems="start">
										<Box sx={{ flexGrow: 1 }}>
											<Stack direction="row" spacing={1} alignItems="center" mb={1}>
												<Chip
													label={cafe.cafe_name}
													sx={{
														backgroundColor: '#9C6CFE',
														color: 'white',
														fontWeight: 'bold',
														fontSize: { xs: '1rem', md: '1.25rem' },
														p: 1
													}}
												/>
												<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
													{cafe.rating}
													<Star sx={{ color: '#FFC107', fontSize: '1rem', ml: 0.5 }} />
												</Typography>
											</Stack>
											<Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }}>
												{cafe.address}
											</Typography>
											<Typography variant="body2" color="text.secondary" fontSize={{ xs: '0.75rem', md: '0.875rem'}} mt={1}>
												{cafe.price_range}
											</Typography>
										</Box>
										<Avatar
											src={cafe.photo.url}
											variant="rounded"
											sx={{ width: 150, height: 150, borderRadius: '12px' }}
											alt={cafe.photo.author_name}
										/>
									</Stack>

									<Grid container spacing={2}>
										<Grid size={{ xs: 12, md: 6 }}>
											{/* Atmosphere */}
											<Stack spacing={1}>
												<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Atmosphere</Typography>
												<Grid container spacing={1}>
													<Grid><Chip icon={<HomeWork color='inherit' />} label="Indoor" sx={{ bgcolor: cafe.atmosphere.indoor ? '#3BCF71' : '#EBEBEB', color: cafe.atmosphere.indoor ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<OutdoorGrill color='inherit' />} label="Outdoor" variant="outlined" sx={{ bgcolor: cafe.atmosphere.outdoor ? '#3BCF71' : '#EBEBEB', color: cafe.atmosphere.outdoor ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
												</Grid>
											</Stack>
										</Grid>
										<Grid size={{ xs: 12, md: 6 }}>
											{/* Menu */}
											<Stack spacing={1}>
												<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Menu</Typography>
												<Grid container spacing={1}>
													<Grid><Chip icon={<Coffee color='inherit' />} label="Coffee" variant="outlined" sx={{ bgcolor: cafe.menu.coffee ? '#3BCF71' : '#EBEBEB', color: cafe.menu.coffee ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<Coffee color='inherit' />} label="Non-coffee" variant="outlined" sx={{ bgcolor: cafe.menu.non_coffee ? '#3BCF71' : '#EBEBEB', color: cafe.menu.non_coffee ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<Fastfood color='inherit' />} label="Rice" variant="outlined" sx={{ bgcolor: cafe.menu.rice ? '#3BCF71' : '#EBEBEB', color: cafe.menu.rice ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<Fastfood color='inherit' />} label="Snack" variant="outlined" sx={{ bgcolor: cafe.menu.snack ? '#3BCF71' : '#EBEBEB', color: cafe.menu.snack ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
												</Grid>
											</Stack>
										</Grid>
										<Grid size={{ xs: 12, md: 6 }}>
											{/* Facilities */}
											<Stack spacing={1}>
												<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Facilities</Typography>
												<Grid container spacing={1}>
													<Grid><Chip icon={<Wifi color='inherit' />} label="Wi-Fi" variant="outlined" sx={{ bgcolor: cafe.facility.wifi ? '#3BCF71' : '#EBEBEB', color: cafe.facility.wifi ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<ElectricalServices color='inherit' />} label="Electricity" variant="outlined" sx={{ bgcolor: cafe.facility.electricity ? '#3BCF71' : '#EBEBEB', color: cafe.facility.electricity ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<Mosque color='inherit' />} label="Mushala" variant="outlined" sx={{ bgcolor: cafe.facility.mushala ? '#3BCF71' : '#EBEBEB', color: cafe.facility.mushala ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<FamilyRestroom color='inherit' />} label="Kids Friendly" sx={{ bgcolor: cafe.facility.kids_friendly ? '#3BCF71' : '#EBEBEB', color: cafe.facility.kids_friendly ? 'primary.contrastText' : '#939393', fontSize: { xs: '0.875rem', md: '1rem' }, p: 1 }} /></Grid>
													<Grid><Chip icon={<Accessible color='inherit' />} label="Accessible" variant="outlined" sx={{ bgcolor: cafe.facility.accessibility ? '#3BCF71' : '#EBEBEB', color: cafe.facility.accessibility ? 'primary.contrastText' : '#939393', fontSize: { xs: '0.875rem', md: '1rem' }, p: 1 }} /></Grid>
												</Grid>
											</Stack>
										</Grid>
										{/* Payment */}
										<Grid size={{ xs: 12, md: 6 }}>
											<Stack spacing={1}>
												<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Payment</Typography>
												<Grid container spacing={1}>
													<Grid><Chip icon={<AttachMoney color='inherit' />} label="Cash" sx={{ bgcolor: cafe.payment.cash ? '#3BCF71' : '#EBEBEB', color: cafe.payment.cash ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
													<Grid><Chip icon={<CreditCard color='inherit' />} label="Non-Cash" variant="outlined" sx={{ bgcolor: cafe.payment.non_cash ? '#3BCF71' : '#EBEBEB', color: cafe.payment.non_cash ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
												</Grid>
											</Stack>
										</Grid>
									</Grid>
									
									{/* Nearby Landmarks */}
									<Stack spacing={1}>
										<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Nearby Landmarks</Typography>
										<Grid container spacing={1}>
											<Grid><Chip icon={<AccountBalance color='inherit' />} label="ATM" variant="outlined" sx={{ bgcolor: cafe.landmark.atm ? '#3BCF71' : '#EBEBEB', color: cafe.landmark.atm ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
											<Grid><Chip icon={<LocalHospital color='inherit' />} label="Hospital" variant="outlined" sx={{ bgcolor: cafe.landmark.rumah_sakit ? '#3BCF71' : '#EBEBEB', color: cafe.landmark.rumah_sakit ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
											<Grid><Chip icon={<Mosque color='inherit' />} label="Mosque" variant="outlined" sx={{ bgcolor: cafe.landmark.masjid ? '#3BCF71' : '#EBEBEB', color: cafe.landmark.masjid ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
											<Grid><Chip icon={<LocalMall color='inherit' />} label="Mall" variant="outlined" sx={{ bgcolor: cafe.landmark.mall ? '#3BCF71' : '#EBEBEB', color: cafe.landmark.mall ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
											<Grid><Chip icon={<LocalMall color='inherit' />} label="Minimarket" variant="outlined" sx={{ bgcolor: cafe.landmark.minimarket ? '#3BCF71' : '#EBEBEB', color: cafe.landmark.minimarket ? 'primary.contrastText' : '#939393', p: 1, fontSize: { xs: '0.875rem', md: '1rem' } }} /></Grid>
										</Grid>
									</Stack>

									{/* Recommended Menu */}
									<Stack spacing={1}>
										<Typography variant="subtitle2" color="text.secondary" fontSize={{ xs: '0.875rem', md: '1rem' }} fontWeight={800}>Recommended Menu</Typography>
										<Typography variant="body2" fontSize={{ xs: '0.75rem', md: '0.875rem' }}>{cafe.recommended_menu.join(', ')}</Typography>
									</Stack>
								</Stack>
							</CardContent>
						</Card>
					</Box>
					))
				)}
			</Container>
		</Box>
  );
};
