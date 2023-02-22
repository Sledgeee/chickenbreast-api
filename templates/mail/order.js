const { CLIENT_URL, API_URL } = process.env

const renderOrderTemplate = (orderId, products) => `
	<div style='margin:0;padding:0;width:100%;background-color:#f2f4f6'>
		<table width='100%' cellpadding='0' cellspacing='0'>
			<tbody>
				<tr>
					<td style='width:100%;margin:0;padding:0;background-color:#f2f4f6' align='center'>
						<table width='100%' cellpadding='0' cellspacing='0'>
							<tbody>
							<tr>
								<td style='padding:25px 0;text-align:center'>
									<a style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:19px;font-weight:bold;color:#2f3133;text-decoration:none"
									 href='${CLIENT_URL}' target='_blank'>
										Чікенбрест
									</a>
								</td>
							</tr>
							<tr>
								<td style='width:100%;margin:0;padding:0;border-top:1px solid #edeff2;border-bottom:1px solid #edeff2;background-color:#fff' width='100%'>
									<table style='width:auto;max-width:100%;margin:0 auto;padding:0' align='center' width='570' cellpadding='0' cellspacing='0'>
										<tbody>
											<tr>
												<td style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;padding:35px">
													<p style='margin-top:0;color:#74787e;font-size:16px;line-height:1.5em'>
														Ви успішно створили замовлення!
													</p>
                                                    <p style='margin-top:0;color:#74787e;font-size:16px;line-height:1.5em'>
														Ідентифікатор вашого замовлення: ${orderId}
													</p>
                                                    <p style='margin-top:0;color:#74787e;font-size:16px;line-height:1.5em'>
														Інформація про замовлення:
													</p>
                                                    <table style="border: 1px solid #000; text-align: center;">
												        <thead>
												        	<tr>
												        		<th style="width: 15%; border: 1px solid #000;"></th>
												        		<th style="width: 53%; border: 1px solid #000;">Назва</th>
                                                                 <th style="width: 12%; border: 1px solid #000;">Кількість</th>
												        		<th style="width: 20%; border: 1px solid #000;">Ціна</th>
                                                                 <th style="width: 20%; border: 1px solid #000;">Загалом</th>
												        	</tr>
												        </thead>
												        <tbody>
												        	${products.map((value) => (
                                                                `<tr style="border: 1px solid #000">
												        			<td style="border: 1px solid #000">
												        				<img
												        					width="150"
												        					height="100"
												        					src="${API_URL}${value.product.image}"
												        					alt="${value.product.name}"
												        				/>
												        			</td>
												        			<td style="border: 1px solid #000">${value.product.name}</td>
												        			<td style="border: 1px solid #000">
												        				<span>${value.quantity}</span>
												        			</td>
												        			<td style="border: 1px solid #000">${value.product.price}₴</td>
                                                                     <td style="border: 1px solid #000">
												        				<span>${value.totalSum}₴</span>
												        			</td>
												        		</tr>`
												        	))}
												        </tbody>
											         </table>
													<table style='margin-top:25px;padding-top:25px;border-top:1px solid #edeff2'>
														<tbody>
														<tr>
															<td style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif">
																<p style='margin-top:0;color:#74787e;font-size:12px;line-height:1.5em'>
																	За посиланням нижче можна переглянути всю інформацію про Ваше замовлення:
																</p>
																<p style='margin-top:0;color:#74787e;font-size:12px;line-height:1.5em'>
																	<a style='color:#3869d4' href='${CLIENT_URL}/track-order/${orderId}' target='_blank'>
																		${CLIENT_URL}/track-order/${orderId}
																	</a>
																</p>
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table style='width:auto;max-width:570px;margin:0 auto;padding:0;text-align:center' align='center' width='570' cellpadding='0' cellspacing='0'>
									<tbody>
										<tr>
											<td style="font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#aeaeae;padding:35px;text-align:center">
												<p style='margin-top:0;color:#74787e;font-size:12px;line-height:1.5em'>
													<strong>Це автоматичний лист, не відповідайте на нього</strong>
													<br>© ${new Date().getUTCFullYear()}
													<a style='color:#3869d4' href='${CLIENT_URL}' target='_blank'>Чікенбрест</a>. Всі права захищені.
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</td>
			</tr>
		</tbody>
	</table>
	</div>
	`

module.exports = { renderOrderTemplate }
