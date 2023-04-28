import { Suspense, lazy, ComponentType } from "react";
import { Spin } from "antd";

const lazyLoad = (Component: () => Promise<{ default: ComponentType<any> }>): JSX.Element => {
	const LazyComponent = lazy(Component);

	return (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					}}
				/>
			}
		>
			<LazyComponent />
		</Suspense>
	);
};

export default lazyLoad;
