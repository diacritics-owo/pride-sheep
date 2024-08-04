package diacritics.owo.mixin.client;

import net.minecraft.client.render.VertexConsumerProvider;
import net.minecraft.client.render.entity.feature.FeatureRenderer;
import net.minecraft.client.render.entity.feature.FeatureRendererContext;
import net.minecraft.client.render.entity.feature.SheepWoolFeatureRenderer;
import net.minecraft.client.render.entity.model.SheepEntityModel;
import net.minecraft.client.render.entity.model.SheepWoolEntityModel;
import net.minecraft.client.util.math.MatrixStack;
import net.minecraft.entity.passive.SheepEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;
import diacritics.owo.PrideSheep;

@Mixin(SheepWoolFeatureRenderer.class)
public abstract class SheepWoolFeatureRendererMixin
		extends FeatureRenderer<SheepEntity, SheepEntityModel<SheepEntity>> {
	@Shadow
	private final SheepWoolEntityModel<SheepEntity> model;

	public SheepWoolFeatureRendererMixin(
			FeatureRendererContext<SheepEntity, SheepEntityModel<SheepEntity>> context) {
		super(context);
		this.model = null;
	}

	@Inject(method = "render", at = @At("HEAD"), cancellable = true)
	public void render(MatrixStack matrixStack, VertexConsumerProvider vertexConsumerProvider, int i,
			SheepEntity sheepEntity, float f, float g, float h, float j, float k, float l,
			CallbackInfo info) {
		if (!sheepEntity.isSheared()) {
			if (!sheepEntity.isInvisible()) {
				if (sheepEntity.hasCustomName() && sheepEntity.getName().getString().startsWith("pride_")) {
					render(this.getContextModel(), this.model,
							PrideSheep.identifier("textures/entity/sheep/"
									+ sheepEntity.getName().getString().replaceFirst("^pride_", "") + ".png"),
							matrixStack, vertexConsumerProvider, i, sheepEntity, f, g, j, k, l, h,
							SheepEntity.getRgbColor(sheepEntity.getColor()));

					info.cancel();
				}
			}
		}
	}
}
