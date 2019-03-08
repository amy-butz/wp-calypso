/**
 * External dependencies
 */
import React, { Component } from 'react';
import page from 'page';
import { connect } from 'react-redux';
import { flowRight } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FormattedHeader from 'components/formatted-header';
import jetpackOnly from './jetpack-only';
import MainWrapper from './main-wrapper';
import SkipButton from './skip-button';
import SiteTopicForm from 'signup/steps/site-topic/form';
import withTrackingTool from 'lib/analytics/with-tracking-tool';
import WpcomColophon from 'components/wpcom-colophon';
import { getSelectedSiteId, getSelectedSiteSlug } from 'state/ui/selectors';
import { saveSiteVertical } from 'state/jetpack-connect/actions';

class JetpackSiteTopic extends Component {
	goToNextStep = () => {
		const { siteSlug } = this.props;

		page.redirect( `/jetpack/connect/plans/${ siteSlug }` );
	};

	handleSubmit = ( { name, slug } ) => {
		const { siteId } = this.props;
		const siteVertical = name || slug || '';

		this.props.saveSiteVertical( siteId, siteVertical );

		this.goToNextStep();
	};

	render() {
		const { translate } = this.props;

		return (
			<MainWrapper isWide>
				<div className="jetpack-connect__step">
					<FormattedHeader
						headerText={ translate( 'Tell us about your website' ) }
						subHeaderText={ translate(
							"Enter a keyword and we'll start tailoring a site for you."
						) }
					/>

					<SiteTopicForm submitForm={ this.handleSubmit } />

					<SkipButton onClick={ this.goToNextStep } />

					<WpcomColophon />
				</div>
			</MainWrapper>
		);
	}
}

const connectComponent = connect(
	state => ( {
		siteId: getSelectedSiteId( state ),
		siteSlug: getSelectedSiteSlug( state ),
	} ),
	{
		saveSiteVertical,
	}
);

export default flowRight(
	connectComponent,
	jetpackOnly,
	localize,
	withTrackingTool( 'HotJar' )
)( JetpackSiteTopic );
